import students from "./data/students.json" assert { type: "json" };
import tasks from "./data/tasks.json" assert { type: "json" };

// const matcher = (): string[] => {
//   return students.reduce((acc, student) => {
    
//     return {
//       ...acc,
//       [student.id]: {
//         student,
//         tasks: tasks.filter((task) => task.tags.every(tag => student.tags.includes(tag))),
//       }
//     }
//   }, {})
// }

const matcher = (): any[] => {
  return students.map((student) => {
    return {
        ...student,
        tasks: tasks.filter((task) => task.tags.every(tag => student.tags.includes(tag))),
      }
    }
  )
}

// const matchedTasks = matcher()
// console.log(JSON.stringify(matchedTasks))


export default matcher;