import React, {useState} from "react";
import {DropzoneArea} from "material-ui-dropzone";
import {Button} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import {API_URL} from "../config/config";

export default function Upload(props) {

  const {url, token, buttonTitle, dispatch, handleSaveCallback} = props;

  const [open, setOpen] = useState(false);

  const [files, setFiles] = useState();

  const [waiting, setWaiting] = useState(false);

  function handleSave() {
    setOpen(false);
    setWaiting(true);
    let data = new FormData();
    data.append('file', files[0]);
    Promise.all([uploadFile(url, data)]).then(([response]) => {
      setWaiting(false);
      handleSaveCallback();
    }).catch(error => console.log(error));
  }

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  return (
    <div>
      {waiting ? <CircularProgress color={'secondary'}/> :
        <Button variant="contained" component="span" onClick={handleOpen}>{buttonTitle}</Button>}

      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{buttonTitle}</DialogTitle>
        <DialogContent>
          <Grid xs container>
            <DropzoneArea
              open={open}
              onChange={files => setFiles(files)}
              acceptedFiles={["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]}
              maxFileSize={50000000}
              onClose={handleClose}
            />
          </Grid>

          <p>­</p>

          <Grid xs container>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Tải lên
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );

  function uploadFile(url, file) {
    let fields;
    fields = {
      method: 'POST',
      headers: {
        "X-Auth-Token": token
      },
      body: file
    };
    return fetch(`${API_URL}/${url}`, fields).then(res => res.json());
  }
}

