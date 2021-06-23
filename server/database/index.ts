import { workoutType } from 'types';

interface workoutData {
  id: number;
  type: workoutType;
  distance: number;
  comment: string;
  date: number;
}

export default class DataBase {
  private _workoutData: workoutData[];
  private _id: number;

  constructor(workoutData: workoutData[]) {
    this._workoutData = workoutData;
    this._id = workoutData.length - 1;
  }

  get workoutData() {
    return [...this._workoutData].reverse();
  }

  insert(comment: string, distance: number, type: workoutType, date: number) {
    if (distance <= 0) throw Error('Distance must be greate then 0');
    const addedIdWorkoutData = this.makeAddedIdWorkoutData(comment, type, date, distance);
    this._workoutData.push(addedIdWorkoutData);
    return this._workoutData[this._workoutData.length - 1];
  }

  edit(id: number, comment: string, distance: number, type: workoutType, date: number) {
    const index = this.checkDataExists(id);
    if (distance <= 0) throw Error('Distance must be greate then 0');

    this._workoutData[index] = { id, comment, type, date, distance };

    return this._workoutData[index];
  }

  delete(id: number) {
    this.checkDataExists(id);
    for (let i = 0; i < this._workoutData.length; i++) {
      if (this._workoutData[i].id === id) {
        this._workoutData = this._workoutData.slice(0, i).concat(this._workoutData.slice(i + 1));
        break;
      }
    }

    return id;
  }

  private makeAddedIdWorkoutData(comment: string, type: workoutType, date: number, distance: number) {
    return { id: ++this._id, comment, date, type, distance };
  }

  private checkDataExists(id: number) {
    const isDataExists = this._workoutData.findIndex(workout => workout.id === id);
    if (isDataExists < 0) throw Error('Not found');
    return isDataExists;
  }
}
