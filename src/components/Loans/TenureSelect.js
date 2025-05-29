import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const TenureSelect = ({ data, setData }) => {
  const handleChange = (event) => {
    setData({ ...data, loanTerm: event.target.value })
  }
  const years = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
  ]

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Tenure</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={data.loanTerm}
        label="Tenure"
        defaultValue={5}
        onChange={handleChange}
      >
        {years.map((value) => (
          <MenuItem key={value} value={value}>
            {value} years
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default TenureSelect
