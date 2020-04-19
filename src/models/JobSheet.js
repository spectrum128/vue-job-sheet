import Task from "./Task";

export default function(nm){

    return {

        name: nm,
        tasks: [],
        staff: [],
        

        updateTask: function(task, staff){
            this.staff = staff;
            console.log('updating task: ', task)
            this.tasks.forEach(t => {
                t.updateTask(task, staff)
            })

        },

        deleteStaffMember(member){
            this.tasks.forEach(t => {
                t.removeWorkDone(member);
            })
        },

        addTask: function(task){
            this.tasks.push(task);
        },

        removeTask: function(task){
            let myTask = this.tasks.find(t => {
                return t.id === task.id
            });
            let ind = this.tasks.indexOf(myTask)
            this.tasks.splice(ind, 1);
        },

        removeSubTask: function(task){
            let myTask = this.tasks.find(t => {
                return t.id === task.parent
            });

            myTask.removeSubTask(task);
        },

        addSubTask: function(task){
            let findid = task.main ? task.id : task.parent;

            let myTask = this.tasks.find(t => {
                return t.id === findid;
            });
            
            console.log('my task', myTask.id, task.id)
            let sub = new Task("new sub task", myTask)

            if(!myTask.hasSubTasks()){
                sub.cloneWorkDone(myTask)
            }
            myTask.addSubTask(sub)
        },

        getTotalHoursForStaffMember: function(stm){

            let total = 0;
            this.tasks.forEach(t => {
                total = total + t.getTotalHoursForStaffMember(stm);
            })
            return total;
        },

        getTotalCostForStaffMember: function(stm){

            let total = 0;
            this.tasks.forEach(t => {
                total = total + t.getTotalCostForStaffMember(stm);
            })

            return total;
        },

        getTotalHours: function(){
            let total = 0;
            this.tasks.forEach(t =>{ 
                total = total + t.getTotalHours();
            })
    
            return total;
        },

        getTotalCost: function(){
            let total = 0;
            this.tasks.forEach(t => {
                total = total + t.getTotalCost();
            })
            return total;
        }
    }
    

}