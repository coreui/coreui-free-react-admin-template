import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, FormControlLabel, Checkbox, Box, useTheme, Typography, Divider } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useDispatch } from 'react-redux';
import { showAlert } from '../../slices/alertSlice';
import { addNewContact } from '../../slices/contactSlice';
import { buildContactDTO, contactDTO } from '../../dto/contactDTO';
import validationSchema from '../../pages/customer-master/contact-details/contactFormValidationSchema';

const ContactForm = (props) => {

    const theme = useTheme();
    const dispatch = useDispatch();

    const [formData, setFormData] = React.useState({...contactDTO});    

    const formik = useFormik({
        initialValues: formData,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            const contactDTO = buildContactDTO(values); 
            console.log("contactDTO: ", contactDTO);
            dispatch(addNewContact(contactDTO));
            const alert = {
                open: true,
                message: "Contact created successfully",
                severity: "success",
            };
            dispatch(showAlert(alert));
            props?.onClose();
        },
    });

    return (
        <Box component="div" height="100vh" >
            <Box component="div" sx={{ ...theme.formControl.formHeaderOuterContainer }}>
                <Box component="div" sx={{ ...theme.formControl.formHeaderContainer }}>
                    <Typography variant="h6" gutterBottom>
                        {props?.isEditContact ? 'Edit Contact' : 'Create New Contact'}
                    </Typography>
                    <Box componet="div" sx={{ ...theme.formControl.formHeaderButtonContainer }}>
                        <Button
                            onClick={props?.onClose}
                            variant="contained"
                            color="secondary"
                            style={
                                props?.page === "popupScreen" ?
                                    {
                                        marginRight: 8,
                                        backgroundColor: '#757575',
                                        color: 'white',
                                        padding: '3px 6px'
                                    }
                                    :
                                    {
                                        marginRight: 8,
                                        backgroundColor: '#757575',
                                        color: 'white'
                                    }
                            }
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={formik.handleSubmit}
                            style={
                                props?.page === "popupScreen" ?
                                    {
                                        padding: '3px 6px'
                                    }
                                    :
                                    {}
                            }
                        >
                            Save Contact
                        </Button>
                    </Box>
                </Box>
                <Divider sx={{ background: 'black' }} />
            </Box>
            <Box component="form" sx={{ ...theme.formControl.formComponent }} >
                <Grid container spacing={2}>
                    <Grid
                        item
                        size={props?.page === "popupScreen" ? { xs: 12 } : { xs: 12, md: 6 }}
                    >
                        <TextField
                            fullWidth
                            id="contactName"
                            name="contactName"
                            label="Contact Name"
                            value={formik.values.contactName}
                            onChange={formik.handleChange}
                            error={formik.touched.contactName && Boolean(formik.errors.contactName)}
                            helperText={formik.touched.contactName && formik.errors.contactName}
                        />
                    </Grid>
                    <Grid
                        item
                        size={props?.page === "popupScreen" ? { xs: 12 } : { xs: 12, md: 6 }}
                    >
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Grid>
                    <Grid
                        item
                        size={props?.page === "popupScreen" ? { xs: 12 } : { xs: 12, md: 6 }}
                    >
                        <TextField
                            fullWidth
                            id="phone"
                            name="phone"
                            label="Phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                        />
                    </Grid>
                    <Grid
                        item
                        size={props?.page === "popupScreen" ? { xs: 12 } : { xs: 12, md: 6 }}
                    >
                        <TextField
                            fullWidth
                            id="extension"
                            name="extension"
                            label="Extension"
                            value={formik.values.extension}
                            onChange={formik.handleChange}
                            error={formik.touched.extension && Boolean(formik.errors.extension)}
                            helperText={formik.touched.extension && formik.errors.extension}
                        />
                    </Grid>
                    <Grid
                        item
                        size={props?.page === "popupScreen" ? { xs: 12 } : { xs: 12, md: 6 }}
                    >
                        <TextField
                            fullWidth
                            id="cellular"
                            name="cellular"
                            label="Cellular"
                            value={formik.values.cellular}
                            onChange={formik.handleChange}
                            error={formik.touched.cellular && Boolean(formik.errors.cellular)}
                            helperText={formik.touched.cellular && formik.errors.cellular}
                        />
                    </Grid>
                    <Grid
                        item
                        size={props?.page === "popupScreen" ? { xs: 12 } : { xs: 12, md: 6 }}
                    >
                        <TextField
                            fullWidth
                            id="position"
                            name="position"
                            label="Position"
                            value={formik.values.position}
                            onChange={formik.handleChange}
                            error={formik.touched.position && Boolean(formik.errors.position)}
                            helperText={formik.touched.position && formik.errors.position}
                        />
                    </Grid>
                    <Grid
                        item
                        size={props?.page === "popupScreen" ? { xs: 12 } : { xs: 12, md: 6 }}
                    >
                        <FormControl fullWidth>
                            <InputLabel id="locked-label">Locked</InputLabel>
                            <Select
                                labelId="locked-label"
                                id="locked"
                                name="locked"
                                value={formik.values.locked || ''}  
                                onChange={formik.handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            >
                                <MenuItem value="locked">Locked</MenuItem>
                                <MenuItem value="unlocked">Unlocked</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid
                        item
                        size={props?.page === "popupScreen" ? { xs: 12 } : { xs: 12, md: 6 }}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="accessPortal"
                                    name="accessPortal"
                                    checked={formik.values.accessPortal}
                                    onChange={formik.handleChange}
                                />
                            }
                            label="Access Portal"
                        />
                    </Grid>
                    <Grid
                        item
                        size={props?.page === "popupScreen" ? { xs: 12 } : { xs: 12, md: 6 }}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="sendEmail"
                                    name="sendEmail"
                                    checked={formik.values.sendEmail}
                                    onChange={formik.handleChange}
                                />
                            }
                            label="Send Email"
                        />
                    </Grid>

                </Grid>
            </Box>
            <Box component="div" py={0}></Box>

        </Box>
    );
};

export default ContactForm;