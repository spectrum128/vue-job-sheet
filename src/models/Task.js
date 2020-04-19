export default function(desc, parent){

    let top = false;
    let parentName = desc;

    if(!parent){
        top = true
    }
    else{
        parentName = parent.description
    }

    return {

        description: desc,
        workDone: [],
        subTasks: [],
        main: top,
        parent: parentName,

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