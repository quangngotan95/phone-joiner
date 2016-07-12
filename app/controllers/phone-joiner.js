import Ember from 'ember';
import Baby from 'npm:babyparse';

export default Ember.Controller.extend({
  range: '',
  csvData: {},
  output: '',
  fileName: '',
  actions: {
    join() {
      let csvData = this.get('csvData');
      let parsed = Baby.parse(csvData);
      let rows = parsed.data;
      let head = rows[0];
      let numberArray = [];
      let index = -1;
      for (let i = 0; i < head.length; i++)
        if (head[i].indexOf('Number') > -1) {
          index = i;
          break;
        }
      if (index > -1)
        for (let i = 1; i < rows.length; i++)
          numberArray.push(rows[i][index]);
      let output = numberArray.join(',');
      this.set('output', output);
    },

    didSelectFiles(fileArray) {

      let file = fileArray[0];
      this.set('fileName', file.name);
      let reader = new FileReader();
      let self = this;
      reader.onload = function() {
        self.set('csvData', reader.result);
      };
      reader.readAsText(file);
    }
  }
});
