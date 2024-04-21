const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const usersForm = require('../model/users');

/**
 * Hàm `RegisterUser` xử lý đăng ký người dùng bằng cách kiểm tra người dùng hiện có, tạo
 * Mật khẩu ngẫu nhiên, băm mật khẩu, lưu người dùng mới vào cơ sở dữ liệu và gửi
 * email xác nhận.
 * @param req - tham số `req` trong hàm` registeruser` thường là một đối tượng đại diện
 * Yêu cầu HTTP.Nó chứa thông tin về yêu cầu được thực hiện cho máy chủ, chẳng hạn như yêu cầu
 * Tiêu đề, cơ thể, thông số, và nhiều hơn nữa.Trong trường hợp này, `req.body` được sử dụng để trích xuất dữ liệu được gửi
 * @param res - tham số
 * Được sử dụng để gửi phản hồi lại cho khách hàng thực hiện yêu cầu.Nó thường được sử dụng để đặt
 * Mã trạng thái và gửi lại dữ liệu cho máy khách.Trong đoạn mã mã được cung cấp, `res` được sử dụng
 * @returns Hàm `RegisterUser` trả về phản hồi dựa trên kết quả của việc đăng ký
 * quá trình.Nếu đăng ký thành công, nó sẽ trả về trạng thái 201 với người dùng tin nhắn '
 * Đã đăng ký thành công.Kiểm tra email của bạn để biết chi tiết đăng nhập. '.Nếu có một người dùng hiện có với
 * Cùng tên người dùng hoặc email, nó trả về trạng thái 400 với tin nhắn 'tên người dùng hoặc email đã
 * tồn tại '.Nếu có một
 */
async function registerUser(req, res) {
  const { username, password, email, fullName, gender, country } = req.body;

  try {
    const existingUser = await usersForm.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).send('Username or email already exists');
    }

    const newPassword = generateRandomPassword();

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const newUser = new usersForm({
      username,
      password: hashedPassword,
      email,
      fullName,
      gender,
      country
    });
    await newUser.save();

    sendConfirmationEmail(email, username, newPassword);

    res.status(201).send('User registered successfully. Check your email for login details.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
}

/**
 * Hàm tạo ra một mật khẩu ngẫu nhiên gồm 8 ký tự bằng cách sử dụng bộ ký tự được xác định trước.
 * @returns Hàm `GeneraterAndompassword` trả về một mật khẩu được tạo ngẫu nhiên bao gồm 8
 * ký tự từ bộ ký tự bao gồm các chữ cái viết thường, chữ hoa, số và số
 * Các ký tự đặc biệt như!@#$%^&* () _+.
 */
function generateRandomPassword() {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let password = '';
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

function sendConfirmationEmail(email, username, password) {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., Gmail
    auth: {
      user: 'tika303103@gmail.com',
      pass: 'bxjijavsbwxnrooy'
    }
  });

  const mailOptions = {
    from: 'VDAS <tika303103@gmail.com>',
    to: email,
    subject: 'Account Registration Confirmation',
    text: `Hello ${username},\n\nYour account has been successfully registered!\nUsername: ${username}\nPassword: ${password}\n\nThank you for registering.`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = { registerUser };
