const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "box1" },
    "task-2": { id: "task-2", content: "box2" },
    "task-3": { id: "task-3", content: "box3" },
    "task-4": { id: "task-4", content: "box4" },
    "task-5": { id: "task-5", content: "box5" },
    "task-6": { id: "task-6", content: "box6" },
    "task-7": { id: "task-7", content: "box7" },
    "task-8": { id: "task-8", content: "box8" },
    "task-9": { id: "task-9", content: "box9" },
    "task-10": { id: "task-10", content: "box10" },
    "task-11": { id: "task-11", content: "box11" },
    "task-12": { id: "task-12", content: "box12" },
    "task-13": { id: "task-13", content: "box13" },
    "task-14": { id: "task-14", content: "box14" },
    "task-15": { id: "task-15", content: "box15" },
    "task-16": { id: "task-16", content: "box16" },
    "task-17": { id: "task-17", content: "box17" },
    "task-18": { id: "task-18", content: "box18" },
    "task-19": { id: "task-19", content: "box19" },
    "task-20": { id: "task-20", content: "box20" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Column1",
      taskIds: ["task-1", "task-2", "task-3", "task-4", "task-5"],
    },
    "column-2": {
      id: "column-2",
      title: "Column2",
      taskIds: [
        "task-6",
        "task-7",
        "task-8",
        "task-9",
        "task-10",
        "task-11",
        "task-12",
      ],
    },
    "column-3": {
      id: "column-3",
      title: "Column3",
      taskIds: ["task-13", "task-14", "task-15", "task-16", "task-17"],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};

export default initialData;