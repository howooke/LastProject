require('dotenv').config();
const authMiddleware = require('../middlewares/authmiddleware');
const { Room, User } = require('../models');

async function main(req, res) {
  try {
    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.perPage || 6);
    const roomLength = await Room.find({});
    const mainLength = roomLength.length;
    const roomList = await Room.find({})
      .sort({ createAt: -1 })
      .skip(perPage * (page - 1)) //perPage가 6이라면 1page로 왔을 때 6*(1-1) = 0이라서 스킵할게 없으니 0부터 6까지 출력
      .limit(perPage);

    res.status(200).json({
      result: true,
      roomList,
      mainLength,
    });
  } catch (error) {
    return res.status(400).send({
      result: false,
      msg: '스터디를 불러올 수 없습니다.',
      errmsg: error.message,
    });
  }
}

async function roomLike(req, res) {
  try {
    const roomId = Number(req.params.roomId);
    const userId = Number(req.params.userId);
    // const nickname = req.nickname;
    console.log(userId); //내 아이디
    const { likeUser, title } = await Room.findOne({ roomId });
    console.log(likeUser); //방안에 유저아이디

    let likeStatus = '';
    let msg = '';

    //해당 방안에 내 아이디 유무확인
    if (!likeUser.includes(userId)) {
      await Room.updateOne({ roomId }, { $push: { likeUser: userId } });
      await User.updateOne({ userId }, { $push: { userLike: roomId } });
      const aaa = await Room.findOne({ roomId });
      console.log(aaa.likeUser); //추가된 방안에 유저아이디
      likeStatus = true;
      msg = `${title}방을 찜 했어요!`;
    } else {
      await Room.updateOne({ roomId }, { $pull: { likeUser: userId } });
      await User.updateOne({ userId }, { $pull: { userLike: roomId } });
      const aaa = await Room.findOne({ roomId });
      console.log(aaa.likeUser); //추가된 방안에 유저아이디
      likeStatus = false;
      msg = `${title}방 찜 해제`;
    }
    const [user] = await Room.find({ roomId });
    const likedUser = user.likeUser;
    console.log(likedUser);
    return res.status(201).send({
      // result: true,
      likeUser: likedUser,
      likeStatus: likeStatus,
      msg: msg,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ errorMessage: error.message });
  }
}

async function roomCategory(req, res) {
  try {
    const { tagName } = req.params;
    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.perPage || 6);
    const roomLength = await Room.find({ tagName });
    const tagLength = roomLength.length;
    console.log(roomLength.length);
    console.log(tagLength);
    const roomList = await Room.find({ tagName })
      .sort({ createAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage);

    res.status(200).json({
      result: true,
      roomList,
      tagLength,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errorMessage: error.message });
  }
}

module.exports = {
  roomCategory,
  roomLike,
  main,
};
