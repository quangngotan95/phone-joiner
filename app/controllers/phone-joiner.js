import Ember from 'ember';
import Baby from 'npm:babyparse';

export default Ember.Controller.extend({
  range: '',
  csvData: {},
  output: '',
  fileName: '',
  columnName: '',
  actions: {
    join() {
      let csvData = this.get('csvData');
      let parsed = Baby.parse(csvData);
      let rows = parsed.data;
      let head = rows[0];
      let numberArray = [];
      let index = -1;
      let columnName = this.get('columnName');
      for (let i = 0; i < head.length; i++) {
        if (head[i].indexOf('number') > -1 || head[i].indexOf('Number') > -1 || head[i].indexOf('Phone') > -1 || head[i].indexOf('phone') > -1) {
          index = i;
          break;
        }
      }
      if (columnName) {
        index = head.indexOf(columnName);
      }
      if (index > -1) {
        for (let i = 1; i < rows.length; i++) {
          let temp = rows[i][index];
          if (!temp) {
            continue;
          }
          if (temp.indexOf('+65') === -1) {
            temp = '+65' + temp;
          }
          numberArray.push(temp);
        }
      }
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
