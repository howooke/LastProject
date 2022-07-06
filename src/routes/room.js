const Room = require("../models/studyroom")
const User = require("../models/user")
const authMiddleware = require("../middlewares/authmiddleware")

const router = require("express").Router()

// 방조회
router.get("/rooms", (req, res, next) => {
  try {
    const roomList = Room.findAll({})
  } catch (error) {
    return res.status(400).send({
      success: false,
      msg: "스터디를 불러올 수 없습니다.",
      errmsg: error.message,
    })
  }
})

// 방생성
router.post("/create", authMiddleware, async (req, res, next) => {
  try {
    const { roomId, tagId, title, content, password, date } = req.body
    
    const newStudyRoom = await Room.create({
      roomId,
      tagId,
      title,
      content,
      password,
      date,
    })
    return res
      .status(201)
      .send({ msg: "스터디 룸을 생성하였습니다.", roomInfo: newStudyRoom })
  } catch (error) {
    return res.status(400).send({
      success: false,
      msg: "스터디를 생성하지 못했습니다.",
      errmsg: error.message,
    })
  }
})

// 공개방 입장
router.post("/enter-room/:roomId", (req, res, next) => {
  try {
    // 공개방 비공개방
    const { nickname } = res.locals.use

    return res.status(200).send(`${nickname}님이 입장하셨습니다`)

  } catch (error) {
    return res.status(400).send({
      success: false,
      msg: "스터디에 입장할 수 없습니다.",
      errmsg: error.message,
    })
  }
})

router.post("/private-room/:roomId", async (req, res, next) => {
  try {
    // 공개방 비공개방
    const { nickname } = res.locals.use
    const passwordCheck = await Room.findOne({ password })
    if(!passwordCheck) {
      return res.status(200).send({ msg: "비밀번호가 틀렸습니다 "})
    }

    return res.status(200).send(`${nickname}님이 입장하셨습니다`)



  } catch (error) {
    return res.status(400).send({
      success: false,
      msg: "스터디에 입장할 수 없습니다.",
      errmsg: error.message,
    })
  }
})


// 방삭제
router.delete("/rooms/:roomId", async (req, res, next) => {
  try {
    // 비밀번호 헤더로 넘기는 방법
    const { roomId } = req.params
    await Room.deleteOne({ roomId })
    return res.json({ result : true , message : "성공적으로 삭제되었습니다."})
  } catch (error) {
    return res.status(400).send({
      success: false,
      msg: "스터디를 삭제할 수 없습니다.",
      errmsg: error.message,
    })
  }
})
// 방나가기
router.post("/room/exit", (req, res, next) => {
  try {
    res.status(201).send({ 
      success: true,
      msg: "스터디 룸에서 나갔습니다" })
  } catch (error) {
    return res.status(400).send({
      success: false,
      msg: "스터디 나가기에 실패했습니다.",
      errmsg: error.message,
    })
  }
})

// 방 찾기
// router.get("/room/search", (req, res, next) => {
//   const { word } = req.params;
//   const { title } = req.body;
//   let postArr = [];
//   let posts = await Room.find({ title });
//   try {
//     for (let i in posts) {
//       if (posts[i].title.includes(word)) {
//         postArr.push(posts[i]);
//       }
//     }
//     return res.status(200).send(postArr);
//   } catch (error) {
//     return res.status(400).json({ result: false, Message: "찾으시는 스터디가 없습니다." });
//   }
// })

module.exports = router