import { useState } from 'react';
import { Button, Modal, Box, Typography } from '@mui/material';
import AddPatientEntryForm from '../AddPatientModal/AddPatientEntryForm';
import { NewEntry } from '../../types';

interface Props {
  onSubmit: (values: NewEntry) => void;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddNewEntry = ({ onSubmit }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => setModalOpen(false);

  const handleSubmit = (values: NewEntry) => {
    onSubmit(values);
    closeModal();
  };

  return (
    <div>
      <Button variant='contained' color='primary' onClick={openModal}>
        ADD NEW ENTRY
      </Button>
      <Modal open={modalOpen} onClose={closeModal}>
        <Box sx={style}>
          <Typography variant='h6' component='h2'>
            Add New Entry
          </Typography>
          <AddPatientEntryForm onSubmit={handleSubmit} />
        </Box>
      </Modal>
    </div>
  );
};

export default AddNewEntry;
