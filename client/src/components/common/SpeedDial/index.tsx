import * as React from 'react';
// speedDial
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
// Icons
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
// modal
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';

// icons and name speedDial
// const actions = [
//   { icon: <FileCopyIcon />, name: 'Copy',  },
//   { icon: <SaveIcon />, name: 'Save' },
//   { icon: <PrintIcon />, name: 'Print' },
//   { icon: <ShareIcon />, name: 'Share' },
// ];

// style modal
// const style = {
//   position: 'absolute' as 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// export default function ControlledOpenSpeedDial() {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => {setOpen(false)};

//   // modal
//   const [openModal, setOpenModal] = React.useState(false);
//   const handleModalOpen = () => {setOpen(false), setOpenModal(true)};
//   const handleModalClose = ()=> {setOpenModal(false)};

//   return (
//     <Box sx={{ height:20, marginRight:10, transform: 'translateZ(0px)', flexGrow: 1 }}>
//       <SpeedDial
//         ariaLabel="SpeedDial controlled open example"
//         sx={{ position: 'absolute', bottom: 16, right: 16 }}
//         icon={<SpeedDialIcon />}
//         onClose={handleClose}
//         onOpen={handleOpen}
//         open={open}
//       >
//         {actions.map((action, index) => (
//           <SpeedDialAction
//             key={index}
//             icon={action.icon}
//             tooltipTitle={action.name}
//             onClick={handleModalOpen}
//           />
//         ))}
//       </SpeedDial>


//       <Modal
//         open={openModal}
//         onClose={handleModalClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Text in a modal
//           </Typography>
//           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//             Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//           </Typography>
//         </Box>
//       </Modal>
//     </Box>
//   );
// }






function MenuDials({ actions  }:any) {
    const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
        position: 'relative',
        '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
          bottom: theme.spacing(2),
          right: theme.spacing(2),
        },
        '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
          top: theme.spacing(2),
          left: theme.spacing(2),
        },
      }));
  return (

    <Box sx={{ height: 50, transform: "translateZ(0px)"}}>
      <StyledSpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{mt:5, bottom: 16, right: 30 }}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        direction={"left"}
      >
        {actions.map((action:any) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            // tooltipOpen
            onClick={() => action.setopen(true)}
          />
        ))}
      </StyledSpeedDial>
    </Box>
  );
}
export default MenuDials;
