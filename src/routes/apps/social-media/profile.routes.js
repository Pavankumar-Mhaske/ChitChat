import { Router } from "express";
import {
  getLoggedInUserOrIgnore,
  verifyJWT,
} from "../../../middlewares/auth.middlewares.js";
import { SocialProfile } from "../../../models/apps/social-media/profile.models.js";
import {
  getMySocialProfile,
  getProfileByUserName,
  updateCoverImage,
  updateSocialProfile,
} from "../../../controllers/apps/social-media/profile.controllers.js";
import { upload } from "../../../middlewares/multer.middlewares.js";
import {
  getProfileByUserNameValidator,
  updateSocialProfileValidator,
} from "../../../validators/apps/social-media/profile.validators.js";
import { validate } from "../../../validators/validate.js";

const router = Router();

// public route
router.route("/u/:username").get(
  getLoggedInUserOrIgnore, // hover over the middleware to know more
  getProfileByUserNameValidator(),
  validate,
  getProfileByUserName
);

router.use(verifyJWT);

// Check if user profile exists or not
// If not create one
// User model is used across the all services
// TODO: create profiles on registration in auth module to avoid this middleware
router.use(async (req, _, next) => {
  const profile = await SocialProfile.findOne({
    owner: req.user._id,
  });
  if (!profile) {
    await SocialProfile.create({
      owner: req.user._id,
    });
  }
  next();
});

router
  .route("/")
  .get(getMySocialProfile)
  .patch(updateSocialProfileValidator(), validate, updateSocialProfile);

router
  .route("/cover-image")
  .patch(upload.single("coverImage"), updateCoverImage);

export default router;