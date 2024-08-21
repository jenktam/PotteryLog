import jwt from 'jsonwebtoken';
import moment from 'moment';
import { db } from '../connect.js';

export const getProjects = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json('Not logged in');
  }

  jwt.verify(token, 'secretKey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    const q = `SELECT p.*
    FROM projects AS p
    JOIN users AS u on (u.id = p.userId)
    WHERE p.userId = ?
    ORDER BY p.dateStarted DESC
    `;

    let values = [userInfo.id, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data);
    });
  });
};

// GET /api/projects/:id
export const getProject = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json('Not logged in!');
  }

  jwt.verify(token, 'secretKey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    const q = `SELECT *
                FROM projects
                WHERE id = ? and userId = ?
              `;

    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);

      if (!data.length) return res.status(404).json('Project not found');
      // Once get project data from database, get images for project
      const imagesQuery = `SELECT *
                            FROM images
                            WHERE projectId = ?
                          `;

      let projectId = data[0].id;
      const imagesValues = [projectId];

      db.query(imagesQuery, imagesValues, (err, imagesData) => {
        if (err) return res.status(500).json(err);
        let response = {
          ...data[0],
          images: imagesData,
        };
        return res.status(200).json(response);
      });
    });
  });
};

// POST /api/projects
export const addProject = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json('Not logged in / authenticated!');
  }

  jwt.verify(token, 'secretKey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');
    const userId = userInfo.id;

    let dateStarted = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    const q =
      'INSERT INTO projects (`dateStarted`, `dateFinished`, `name`, `clayType`, `weight`, `size`, `status`, `technique`, `handbuilt`, `location`, `firing`, `glazing`, `notes`, `userId`, `difficultyRating`, `detailsRating`, `finishingRating`, `coverPic`) VALUE (?)';

    const {
      dateFinished,
      name,
      clayType,
      weight,
      size,
      status,
      technique,
      handbuilt,
      location,
      firing,
      glazing,
      notes,
      difficultyRating,
      detailsRating,
      finishingRating,
      coverPic,
    } = req.body;

    const values = [
      dateStarted,
      dateFinished,
      name,
      clayType,
      weight,
      size,
      status,
      technique,
      handbuilt,
      location,
      firing,
      glazing,
      notes,
      userId,
      difficultyRating,
      detailsRating,
      finishingRating,
      coverPic,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length)
        return res
          .status(409)
          .json('Please fill out the form to add a new project.');
      let projectId = data.insertId;

      // TODO:  async and promises
      if (projectId) {
        let uploadAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

        const { files } = req.body;
        const imagesQuery =
          'INSERT INTO images (`name`, `filename`, `size`, `mimetype`, `uploadAt`, `projectId`) VALUES ?';

        let imagesValues = files.map(
          ({ originalname, filename, size, mimetype }) => [
            originalname,
            filename,
            size,
            mimetype,
            uploadAt,
            projectId,
          ]
        );

        db.query(imagesQuery, [imagesValues], (err, data) => {
          if (err) return res.status(500).json(err);

          console.log('Successfully inserted images:', data);
          return res.status(200).json('Project has been created!');
        });
      }
    });
  });
};

// PUT /api/projects/:id
export const updateProject = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json('Not logged in / authenticated');
  }

  jwt.verify(token, 'secretKey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    let userId = userInfo.id;

    let q =
      'UPDATE projects SET `name` = ?, `clayType` =?, `weight` = ?, `size` =?, `status` = ?, `technique` = ?, `handbuilt` = ?, `location` = ?, `firing` = ?, `glazing` = ?, `notes` = ?, `userId` = ?, `difficultyRating` = ?, `detailsRating` = ?, `finishingRating` = ? WHERE `id` = ?';

    const {
      name,
      clayType,
      weight,
      size,
      status,
      technique,
      handbuilt,
      location,
      firing,
      glazing,
      notes,
      difficultyRating,
      detailsRating,
      finishingRating,
    } = req.body;

    const values = [
      name,
      clayType,
      weight,
      size,
      status,
      technique,
      handbuilt,
      location,
      firing,
      glazing,
      notes,
      userId,
      difficultyRating,
      detailsRating,
      finishingRating,
    ];

    db.query(q, [...values, req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);

      // Handle hitting project that is not in db
      if (data.affectedRows === 0)
        return res
          .status(404)
          .json("Project does not exist so can't update it.");

      return res.status(200).json('Updated!');
    });
  });
};

// DELETE /api/projects/:id
export const deleteProject = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json('Not logged in / authenticated!');
  }

  jwt.verify(token, 'secretKey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    const q = 'DELETE FROM projects WHERE id=? AND userId=?';

    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);

      if (data.affectedRows === 0)
        return res
          .status(404)
          .json("Project does not exist so can't delete it.");
      return res.status(200).json('Project deleted!');
    });
  });
};
