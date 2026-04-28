const User = require("../models/user.model")
const axios = require("axios")
const Project = require("../models/projects.model")
const Invite = require("../models/invite.model")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const inviteByUsername = async (req , res ,next)=>{

    try {
        
        const {username , projectId , role} = req.body
        const {id} = req.user

        if (!username) {
            return res.status(400).json({success:false , message:"Username is required"})
        }

        if (!id) {
            return res.status(401).json({success:false , message:"invalid token"})
        }

        const invitedUser = await User.findOne({username})
        const user = await User.findById(id)

        

        if (!invitedUser) {
            return res.status(404).json({success:false , message:"User not found"})
        }

        const project = await Project.findById(projectId)

        console.log("project.repo_owner_user:", project.repo_owner_user.toString())
console.log("user._id:", user._id.toString())
console.log("equals result:", project.repo_owner_user.equals(user._id))
console.log("isMatch: " , project.repo_owner_user.toString() === user._id.toString())

           if (!project) {
            return res.status(404).json({success:false , message:"Project not found"})
        }

        

if (project.repo_owner_user.toString() !== user._id.toString()) {
  return res.status(403).json({success: false, message: "the project does not belong to you"})
}

        const alreadyInvited = await Invite.findOne({project:projectId , invitedUser:invitedUser._id , status:"pending"})

if (alreadyInvited) {
  return res.status(400).json({success:false , message:"User already invited"})
}

        const alreadyMember = project.members.some(m =>
  m.user.equals(invitedUser._id)
)

if (alreadyMember) {
  return res.status(400).json({success:false , message:"This user already member"})
}



        const tokenId = crypto.randomUUID().toString()
        const token = jwt.sign({
tokenId,
        } ,process.env.JWT_INVITE_SECRET , {expiresIn:"7d"} )

        const invite = await Invite.create({
          project,
          invitedUser,
          inviteBy:user,
          tokenId,
          role
        })
            
const sendRequest = await axios.post(
  "https://api.brevo.com/v3/smtp/email",
  {
    sender: {
      name: "GitLuma",
      email: "saidazim186@gmail.com",
    },
    to: [
      {
        email: invitedUser.email,
        name: invitedUser.username,
      },
    ],
    subject: "🚀 Приглашение в проект GitLuma",
  htmlContent: `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light">
</head>
<body style="margin:0;padding:0;background:#EEF1F7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
 
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#EEF1F7;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
 
          <!-- LOGO -->
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <svg viewBox="0 0 220 80" xmlns="http://www.w3.org/2000/svg" width="160" height="58">
                <path d="M 14 6 C 6 6 2 18 30 40 C 2 62 6 74 14 74"
                      stroke="#2B3141" stroke-width="5.5" stroke-linecap="round" fill="none"/>
                <path d="M 46 6 C 54 6 58 18 30 40 C 58 62 54 74 46 74"
                      stroke="#2B3141" stroke-width="5.5" stroke-linecap="round" fill="none"/>
                <circle cx="30" cy="40" r="5.5" fill="#E8654A"/>
                <text x="66" y="51"
                      font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif"
                      font-size="32" font-weight="700" fill="#2B3141">Git</text>
                <text x="113" y="51"
                      font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif"
                      font-size="32" font-weight="700" fill="#E8654A">Luma</text>
              </svg>
            </td>
          </tr>
 
          <!-- CARD -->
          <tr>
            <td style="background:#ffffff;border-radius:16px;overflow:hidden;">
 
              <!-- TOP ACCENT BAR -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#E8654A;height:4px;font-size:0;line-height:0;">&nbsp;</td>
                </tr>
              </table>
 
              <!-- BODY -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:40px 40px 36px;">
 
                    <!-- HEADING -->
                    <p style="margin:0 0 8px 0;font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#E8654A;">
                      Новое приглашение
                    </p>
                    <h1 style="margin:0 0 24px 0;font-size:24px;font-weight:700;color:#2B3141;line-height:1.3;">
                      Тебя добавили<br>в командный проект
                    </h1>
 
                    <!-- SENDER INFO -->
                    <table cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                      <tr>
                        <td style="width:40px;height:40px;border-radius:50%;background:#EEF1F7;text-align:center;vertical-align:middle;font-size:16px;font-weight:700;color:#2B3141;">
                          ${user.username.charAt(0).toUpperCase()}
                        </td>
                        <td style="padding-left:12px;vertical-align:middle;">
                          <p style="margin:0;font-size:14px;font-weight:600;color:#2B3141;">${user.username}</p>
                          <p style="margin:0;font-size:13px;color:#9AA0B4;">приглашает тебя в команду</p>
                        </td>
                      </tr>
                    </table>
 
                    <!-- PROJECT BLOCK -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                      <tr>
                        <td style="background:#EEF1F7;border-radius:10px;border-left:3px solid #E8654A;padding:16px 18px;">
                          <p style="margin:0 0 4px 0;font-size:11px;font-weight:600;letter-spacing:.07em;text-transform:uppercase;color:#9AA0B4;">
                            Репозиторий
                          </p>
                          <p style="margin:0;font-size:16px;font-weight:700;color:#2B3141;">
                            ${project.repo_fullname}
                          </p>
                        </td>
                      </tr>
                    </table>
 
                    <!-- DESCRIPTION -->
                    <p style="margin:0 0 32px 0;font-size:14px;color:#5C6480;line-height:1.7;">
                      После принятия приглашения ты получишь доступ к репозиторию и начнёшь получать уведомления о коммитах, пуллреквестах и активности команды.
                    </p>
 
                    <!-- CTA BUTTON -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center">
                          <a href="${process.env.BACKEND_URL}/api/invite/accept?token=${token}"
                             style="display:inline-block;background:#E8654A;color:#ffffff;
                                    padding:14px 36px;border-radius:10px;
                                    text-decoration:none;font-weight:700;font-size:15px;
                                    letter-spacing:.01em;">
                            Принять приглашение →
                          </a>
                        </td>
                      </tr>
                    </table>
 
                    <!-- DIVIDER -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin:32px 0 24px;">
                      <tr>
                        <td style="border-top:1px solid #EEF1F7;font-size:0;line-height:0;">&nbsp;</td>
                      </tr>
                    </table>
 
                    <!-- FALLBACK LINK -->
                    <p style="margin:0 0 6px 0;font-size:12px;color:#9AA0B4;">
                      Если кнопка не работает, скопируй ссылку:
                    </p>
                    <p style="margin:0;font-size:12px;color:#E8654A;word-break:break-all;">
                      
                    </p>
 
                  </td>
                </tr>
              </table>
 
            </td>
          </tr>
 
          <!-- FOOTER -->
          <tr>
            <td style="padding:24px 16px 8px;text-align:center;">
              <p style="margin:0 0 6px 0;font-size:12px;color:#9AA0B4;">
                Ссылка действует&nbsp;<b style="color:#5C6480;">7 дней.</b>
              </p>
              <p style="margin:0;font-size:12px;color:#C8CDD9;">
                Если ты не ожидал этого письма — просто проигнорируй его.
              </p>
              <p style="margin:16px 0 0;font-size:11px;color:#C8CDD9;">
                &copy; ${new Date().getFullYear()} GitLuma
              </p>
            </td>
          </tr>
 
        </table>
      </td>
    </tr>
  </table>
 
</body>
</html>
`
 
  },
  {
    headers: {
      "api-key": process.env.BREVO_API_KEY,
      "Content-Type": "application/json",
    },
  }
);


res.json({success:true, message:"User invited!"})
        

    } catch (err) {
        next(err)
    }

}


const acceptInvite = async (req , res, next)=>{


  try {

  const {token} = req.query

  const decoded = jwt.verify(token , process.env.JWT_INVITE_SECRET)

  const invite = await Invite.findOne({tokenId:decoded.tokenId})

  if (!invite) {
    return res.status(404).json({success:false , message:"Invite not found"})
  }

  if (invite.status !== "pending") {
    return res.status(400).json({success:false , message:"invitation has already been used"});
  }

  const project = await Project.findById(invite.project)

  if (!project) {
    return res.status(404).json({success:false , message:"Project not found"})
  }

  const invitedUser = await User.findById(invite.invitedUser)

  if (!invitedUser) {
    return res.status(404).json({success:false , message:"User not found"})
  }

  const alreadyMember = project.members.some(m =>
  m.user.equals(invitedUser._id)
)

if (alreadyMember) {
  return res.redirect(`${process.env.FRONTEND_URL}/dashboard/project/${project._id}`)
}

  project.members.push({user:invitedUser._id , role:invite.role})

  await project.save()

  invite.status = "accepted"

  await invite.save()
    
  res.redirect(`${process.env.FRONTEND_URL}/dashboard/project/${project._id}`)

  } catch (err) {
    next(err)
  }

}


module.exports = {
    inviteByUsername,
    acceptInvite
}