

export default function(desc, parent){

    let top = false;
    let parentName = desc;
    let newId = new Date().valueOf() + '' + Math.floor((Math.random() * 10000) + 1);

    if(!parent){
        top = true
    }
    else{
        parentName = parent.description
    }

    return {

        id: newId,
        description: desc,
        workDone: [],
        subTasks: [],
        main: top,
        parent: parent && parent.id || newId,

        hasSubTasks: function(){
            if(this.subTasks.length > 0){
                return true
            }
            return false
        },

        cloneWorkDone: function(task){

            this.workDone = [];
            while(task.workDone.length > 0){
                let o = task.workDone.splice(0, 1);
                this.workDone.push(o[0])
                //console.log(o)
            }
        },

        updateTask: function(task, staff){
            
            if(task.id === this.id){
                this.description = task.description
                
                // this.workDone.forEach(wd => {
                //     if(task.hasOwnProperty(wd.staffMember.id)){
                //         wd.hours = task[wd.staffMember.id];
                        
                //     }
                // })
                this.workDone = [];
                staff.forEach(stf => {
                    this.workDone.push({
                       staffMember: stf,
                       hours: task[stf.id] || 0 
                    })
                })

                
            }

            this.subTasks.forEach(st => {
                st.updateTask(task, staff)
            })
        },

        addSubTask: function(task){
            this.subTasks.push(task)
        },

        removeSubTask: function(task){
            let ind = this.subTasks.indexOf(task);
            this.subTasks.splice(ind, 1);
        },

        getTotalHoursForStaffMember: function(member){
            let total = 0;

            if(this.subTasks.length > 0){

                this.subTasks.forEach(st => {
                    total = total + st.getTotalHoursForStaffMember(member)
                })
            }
            else{

                this.workDone.forEach(wd => {
                    if(wd.staffMember == member){
                        total = total + wd.hours
                    }
                })
            }

            return total
        },

        getTotalCostForStaffMember: function(member){
            let total = 0;

            if(this.subTasks.length > 0){

                this.subTasks.forEach(st => {
                    total = total + st.getTotalCostForStaffMember(member)
                })
            }
            else{

                this.workDone.forEach(wd => {
                    if(wd.staffMember == member){
                        total = total + (wd.hours * wd.staffMember.rate)
                    }
                })
            }

            return total
        },

        getTotalHours: function (){
            let total = 0;
            
            if(this.subTasks.length > 0){
                this.subTasks.forEach(st => {
                    total = total + st.getTotalHours();
                })
            }
            else{
                
                this.workDone.forEach(wd => {
                    total = total + wd.hours;
                })
            }
            

            return total;
        },

        getTotalCost: function(){

            let total = 0;
            
            if(this.subTasks.length > 0){
                this.subTasks.forEach(st => {
                    total = total + st.getTotalCost();
                })
            }
            else{

                this.workDone.forEach(wd => {
                    total = total + (wd.hours * wd.staffMember.rate)
                })
            }

            return total;
        }

    }
    
}