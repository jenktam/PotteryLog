export const getUpload = (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
};

export const getUploads = (req, res) => {
  const files = req.files;
  let count = req.files.length;
  console.log('files: ', files);
  res.status(200).json({ success: true, fileCount: count, files: files });
};