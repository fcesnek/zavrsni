const UserProfileController = require('./controllers/UserProfileController')
const UserProfileControllerPolicy = require('./policies/UserProfileControllerPolicy')
const ExercisesController = require('./controllers/ExercisesController')
const ExercisesPlanController = require('./controllers/ExercisesPlanController')
const HistoriesController = require('./controllers/HistoriesController')
const ExercisesDoneController = require('./controllers/ExercisesDoneController')
const isAuthenticated = require('./policies/isAuthenticated')

module.exports = (app) => {
  app.post('/register',
    UserProfileControllerPolicy.register,
    UserProfileController.register)

  app.post('/login',
    UserProfileController.login)

  app.get('/profile',
    isAuthenticated,
    UserProfileController.show)

  app.put('/update-profile',
    isAuthenticated,
    UserProfileControllerPolicy.update,
    UserProfileController.update)

  app.get('/exercises',
    ExercisesController.index)

  app.get('/exercises/:exerciseId',
    ExercisesController.show)

  app.put('/exercises/:exerciseId',
    isAuthenticated,
    ExercisesController.put)

  app.post('/exercises',
    isAuthenticated,
    ExercisesController.post)

  app.get('/plan',
    isAuthenticated,
    ExercisesPlanController.index)

  app.put('/exercises/:exerciseId/add',
    isAuthenticated,
    ExercisesPlanController.add)
  app.delete('/exercises/:exerciseId/remove',
    isAuthenticated,
    ExercisesPlanController.remove)

  app.get('/history',
    isAuthenticated,
    HistoriesController.index)
  app.put('/history',
    isAuthenticated,
    HistoriesController.add)
  app.delete('/history',
    isAuthenticated,
    HistoriesController.clear)

  app.get('/exercise-finished',
    isAuthenticated,
    ExercisesDoneController.index)
  app.put('/exercise-finished',
    isAuthenticated,
    ExercisesDoneController.add)
  app.delete('/exercise-finished/:exerciseId/remove',
    isAuthenticated,
    ExercisesDoneController.remove)

  app.get('/suggestions',
    isAuthenticated,
    ExercisesController.showSuggestions)
}
