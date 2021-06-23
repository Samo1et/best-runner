import { Router } from 'express';

import Database from '../database';
import dummy from '../database/dummy';

const router = Router();

const db = new Database(dummy);

router.get('/', (req, res) => {
  try {
    return res.status(200).json({ workoutDatas: db.workoutData });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Catch error' });
  }
});

router.post('/', (req, res) => {
  try {
    const { comment, date, type, distance } = req.body;
    const result = db.insert(comment, distance, type, date);

    return res.status(200).json({
      message: 'Success workout insert',
      workoutDatas: {
        id: result.id,
        comment: result.comment,
        distance: result.distance,
        type: result.type,
        date: result.date,
      },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Catch error' });
  }
});

router.post('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { comment, date, type, distance } = req.body;
    const result = db.edit(id, comment, distance, type, date);

    return res.status(200).json({
      message: 'Success edited',
      workoutDatas: {
        id: result.id,
        comment: result.comment,
        distance: result.distance,
        type: result.type,
        date: result.date,
      },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Catch error' });
  }
});

router.delete('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    db.delete(id);
    return res.status(200).json({ message: 'Success delete data', id });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Catch error' });
  }
});

export default router;
