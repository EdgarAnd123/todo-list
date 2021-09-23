export default {
  name: "ToDoList",
  data() {
    return {
      title: "",
      editTitle: "",
      tasks: []
    };
  },
  methods: {
    createTask() {
      if( this.title ) {
        this.tasks.push({
          title: this.title,
          editing: false
        });
  
        this.title = "";
      }
    },

    editTask( task ) {
      this.tasks.map( task => task.editing = false );
      this.editTitle = task.title;

      task.editing = true;
    },

    updateTask( task ) {
      task.title = this.editTitle;
      task.editing = false;
    },

    cancelEdit( task ) {
      task.editing = false;
    },

    deleteTask( index ) {
      this.tasks.splice( index, 1 );
    }    
  },
  computed: {
    isEditing() {
      return this.tasks.some( ( task ) => task.editing );
    }
  }
};