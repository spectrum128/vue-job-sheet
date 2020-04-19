<template>
  <div>
    
    
    <v-container>
    <v-row class="text-center">
     
      <v-col class="mb-5" cols="12">
        <v-row justify="center">

            <job-sheet></job-sheet>
          
        </v-row>
      </v-col>

      
    </v-row>
  </v-container>
  </div>
</template>

<script>
import JobSheet from '../components/JobSheet.vue'

export default {
  name: 'Main',
  components: {
    JobSheet
  }
}
</script>


