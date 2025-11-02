import express from 'express'

router = express.Router()

router.post("/signup", upload.single("profileImage"), signUp);