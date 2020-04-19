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
          <v-col cols=2>
              <v-btn large @click="addNewTask">Add a Task</v-btn>
          </v-col>
          <v-col cols=8>

          </v-col>
      </v-row>
      <v-row>
          <v-col>
              <v-data-table v-if="ready" :headers="headers" :items="jobSheetData" :items-per-page="1000" :hide-default-footer="true"  class="elevation-1">

                <template v-slot:item="{ item }">
                    <tr v-if="(item.main && item.hasSubTasks) || item.isInfoRow" :class="{'green lighten-4': item.isInfoRow, 'grey lighten-2': !item.isInfoRow}">
                        <td v-for="(h,idx) in headers" :key="idx">
                            <span v-if="h.value != 'description' || item.isInfoRow">{{item[h.value]}}</span>
                            <v-text-field v-if="h.value === 'description' && !item.isInfoRow" outlined dense class="pt-4" v-model="item[h.value]" v-on:keyup="updateDataStructure(item)"></v-text-field>
                            
                            <div>
                                <v-btn small color="blue lighten-3" v-if="h.value === 'action' && !item.isInfoRow" @click="addSubTask(item)">Add Subtask</v-btn>
                            
                            
                            </div>
                                
                        </td>
                        <td>
                                <v-btn small color="red lighten-4" v-if="!item.isInfoRow" @click="deleteTask(item)">Delete</v-btn>
                            
                        </td>
                    
                    </tr>

                    <tr v-if="(!item.main || !item.hasSubTasks) && !item.isInfoRow" :class="{ 'grey lighten-2': (item.main && !item.hasSubTasks) }">
                        <td v-for="(h,idx) in headers" :key="idx">
                            
                            <v-text-field outlined :reverse="h.value != 'description'" dense class="pt-4" v-if="(!h.isTextField && !item.isInfoRow) || (h.value == 'description')" v-model.number="item[h.value]" v-on:keyup="updateDataStructure(item)"></v-text-field>
                            <span v-if="(h.isTextField || item.isInfoRow) && h.value != 'description'">{{item[h.value]}}</span>
                            
                                <v-btn small color="blue lighten-3" v-if="h.value === 'action' && !item.isInfoRow && item.main" @click="addSubTask(item)">Add Subtask</v-btn>
                            
                            
                                
                            
                        </td>
                        <td><v-btn small color="red lighten-4" v-if="!item.isInfoRow" @click="deleteTask(item)">Delete</v-btn></td>
                    </tr>
                </template>
              
              </v-data-table>
          </v-col>
      </v-row>
      <v-row>
          <v-col cols=2>
              <v-btn large @click="addNewTask">Add a Task</v-btn>
          </v-col>
          <v-col cols=8>

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
        trigger: false

        
    }),

    mounted(){
        this.initialise();
    },

    methods: {

        forceUpdate(){
            //this.$forceUpdate()
            this.trigger = 1;
        },

        updateDataStructure(item){
            this.jobSheet.updateTask(item, this.staff);
            this.forceUpdate();
        },

        addSubTask(task){

            this.jobSheet.addSubTask(task)
        },

        

        deleteTask(task){

            let con = window.confirm("Are you sure you wish to delete the task: " + task.description + "?")
            if(con){
                if(task.main){
                    this.jobSheet.removeTask(task)
                }
                else{
                    this.jobSheet.removeSubTask(task)
                }
            }
            
        },

        isRoot(it){
            return it && it.main || false
        },

        addNewTask(){
            let task = new Task("New Task");
            this.jobSheet.addTask(task);
        },

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
                totalHoursTask[stm.id] = this.jobSheet.getTotalHoursForStaffMember(stm);
            })

            totalHoursTask.totalHours = this.jobSheet.getTotalHours();
            totalHoursTask.totalCost = "";
            totalHoursTask.main = false;
            totalHoursTask.id = "totalhourstask"
            totalHoursTask.isInfoRow = true;

            return totalHoursTask;
        },

        getTotalCostTask(){

            let totalCostTask = { description: 'Total Cost' };

            this.staff.forEach(stm => {
                totalCostTask[stm.id] = this.jobSheet.getTotalCostForStaffMember(stm);
            })

            totalCostTask.totalHours = ""
            totalCostTask.totalCost = this.jobSheet.getTotalCost();
            totalCostTask.main = false;
            totalCostTask.id = "totalcosttask";
            totalCostTask.isInfoRow = true;

            return totalCostTask;
        },

        flattenTask(t){

            let task = {}
            task.description = t.description;
            this.staff.forEach(stm => {
                task[stm.id] = t.getTotalHoursForStaffMember(stm)
            })
            task.totalHours = t.getTotalHours();
            task.totalCost = t.getTotalCost();
            task.parent = t.parent;
            task.main = t.main;
            task.hasSubTasks = t.hasSubTasks();
            task.id = t.id;
            

            return task;
        }
    },

    computed: {

        headers: function(){
            let data = [
                { text: 'Description', value: 'description', isTextField: true}
            ]

            this.staff.forEach(stm => {
                data.push({ text: stm.name + ' (' + stm.rate + ')', value: stm.id })
            })

            data.push({ text: 'Total Hours', value: 'totalHours', isTextField: true})
            data.push({ text: 'Total Cost', value: 'totalCost', isTextField: true})
            data.push({ text: 'Action', value: 'action', isTextField: true})

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

            if(this.trigger == 1){
                this.trigger = 0;
            }

            
            return data;
        }
    }
}
</script>
