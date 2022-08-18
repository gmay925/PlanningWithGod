// get all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id

  const workouts = await Workout.find({user_id}).sort({createdAt: -1})

  res.status(200).json(workouts)
}