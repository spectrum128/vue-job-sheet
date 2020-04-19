export default function(nm){

    return {

        name: nm,
        tasks: [],

        addTask: function(task){
            this.tasks.push(task);
        },

        removeTask: function(task){
            let ind = this.tasks.indexOf(task);
            this.tasks.splice(ind, 1);
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