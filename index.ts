import express, { NextFunction, Request, Response, request, response } from 'express';
// import ErrorHandler from './src/middlewares/error-handler';
// import AuthenticationHandler from './src/middlewares/authentication-handler';

const app = express();
app.use(express.json())

// app.use(AuthenticationHandler)

// app.get('/', (req: Request, res: Response) => {
//   return res.status(401);
// });

app.get('/test', (req, res) => {
  res.status(200).json(req.headers);
});

const versions = ['v1']

versions.forEach(async (version) => {
  const { default: versionRoutes } = await import('./src/modules/' + version + '/routes')
  app.use('/api/' + version, versionRoutes)
})


const port = 3001;
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

// app.use(ErrorHandler);
