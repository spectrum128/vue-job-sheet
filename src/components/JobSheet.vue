<template>
    <v-container>

      <v-row>
          <v-col>
              <h2 v-if="ready">
                  {{ jobSheet.name }}
              </h2>
          </v-col>
      </v-row>
      <v-row>
          <v-col>
              <v-data-table v-if="ready" :headers="headers" :items="jobSheetData" :items-per-page="1000" :hide-default-footer="true"  class="elevation-1">

              </v-data-table>
          </v-col>
      </v-row>
      <v-row>
          <v-col>

          </v-col>
      </v-row>

     </v-container>
</template>

<script>

import Sheet from '../models/JobSheet'
import Task from '../models/Task'
import StaffMember from '../models/StaffMember'
import JobSheet from '../models/JobSheet'

export default {
    name: 'JobSheet',

    data: () => ({
        
        jobSheet: null,
        ready: false,
        staff: [],
        

        
    }),

    mounted(){
        this.initialise();
    },

    methods: {

        initialise(){
            this.jobSheet = new JobSheet('Sheet 1')
            let bob = new StaffMember('Bob', 200);
            let sally = new StaffMember('Sally', 150);
            let joe = new StaffMember('Joe', 100);
            this.staff.push(bob);
            this.staff.push(sally);
            this.staff.push(joe);

            let task1 = new Task("Task 1");
            task1.workDone.push({ staffMember: bob, hours: 8 })
            task1.workDone.push({ staffMember: sally, hours: 56 })
            task1.workDone.push({ staffMember: joe, hours: 56 })
            console.log('task 1 total hours: ', task1.getTotalHours())
            console.log('task 1 total cost: ', task1.getTotalCost())

            let task1_1 = new Task("Task 1.1");
            let subTask1_1_1 = new Task("subtask 1", task1_1);
            subTask1_1_1.workDone.push({ staffMember: bob, hours: 8 })
            subTask1_1_1.workDone.push({ staffMember: sally, hours: 40 })
            subTask1_1_1.workDone.push({ staffMember: joe, hours: 8 })
            task1_1.addSubTask(subTask1_1_1)
            console.log('task 1.1 total hours: ', task1_1.getTotalHours())
            console.log('task 1.1 total cost: ', task1_1.getTotalCost())

            this.jobSheet.addTask(task1)
            this.jobSheet.addTask(task1_1)

            
            
            console.log('jobsheet total hours: ', this.jobSheet.getTotalHours())
            console.log('jobsheet total cost:', this.jobSheet.getTotalCost())

            console.log('table data:', this.jobSheetData)

            this.ready = true

        },

        getTotalHoursTask(){

            let totalHoursTask = { description: 'Total Hours' };

            this.staff.forEach(stm => {
                totalHoursTask[stm.name] = this.jobSheet.getTotalHoursForStaffMember(stm);
            })

            totalHoursTask.totalHours = this.jobSheet.getTotalHours();
            totalHoursTask.totalCost = "";

            return totalHoursTask;
        },

        getTotalCostTask(){

            let totalCostTask = { description: 'Total Cost' };

            this.staff.forEach(stm => {
                totalCostTask[stm.name] = this.jobSheet.getTotalCostForStaffMember(stm);
            })

            totalCostTask.totalHours = ""
            totalCostTask.totalCost = this.jobSheet.getTotalCost();

            return totalCostTask;
        },

        flattenTask(t){

            let task = {}
            task.description = t.description;
            this.staff.forEach(stm => {
                task[stm.name] = t.getTotalHoursForStaffMember(stm)
            })
            task.totalHours = t.getTotalHours();
            task.totalCost = t.getTotalCost();
            task.parent = t.parent;

            return task;
        }
    },

    computed: {

        headers: function(){
            let data = [
                { text: 'Description', value: 'description'}
            ]

            this.staff.forEach(stm => {
                data.push({ text: stm.name + ' (' + stm.rate + ')', value: stm.name })
            })

            data.push({ text: 'Total Hours', value: 'totalHours'})
            data.push({ text: 'Total Cost', value: 'totalCost'})

            return data;
        },

        jobSheetData: function(){
            let data = [];

            this.jobSheet.tasks.forEach(t => {

                let task = this.flattenTask(t);

                data.push(task);

                t.subTasks.forEach(st => {
                    let sub = this.flattenTask(st);
                    data.push(sub)
                })

            });

            let totalHoursTask = this.getTotalHoursTask();
            data.push(totalHoursTask);

            let totalCostTask = this.getTotalCostTask();
            data.push(totalCostTask)

            
            return data;
        }
    }
}
</script>
