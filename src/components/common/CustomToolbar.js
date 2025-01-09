import { GridToolbarContainer, GridToolbarFilterButton, GridToolbarQuickFilter } from "@mui/x-data-grid"

export const CustomToolbar = () => {
    return (
        <GridToolbarContainer sx={{ p: 2, mb: 1 }}>
           <GridToolbarFilterButton />
           <GridToolbarQuickFilter sx={{ marginLeft: "10px" }} />
        </GridToolbarContainer>
        
    )
}