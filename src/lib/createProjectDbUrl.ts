export const createProjectDbUrl = (projectId: string) => {
  return `mongodb+srv://duty:sabadhela11@cluster0.sb7ar.mongodb.net/${projectId}?retryWrites=true&w=majority`
}
