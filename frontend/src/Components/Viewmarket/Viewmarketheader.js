import { Container, Toolbar, Select, MenuItem } from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";

const Viewmarketheader = () => {
  const changeCurrency = useSelector((state) => state.viewMarketReducer);
  const dispatch = useDispatch();

  // if theme change color change

  return (
    <Container>
      <Toolbar style={{ flex: 1, justifyContent: "space-between" }}>
        <Select
          variant="outlined"
          style={{
            width: 100,
            height: 40,
            marginRight: 15,
          }}
          value={changeCurrency.currency}
        >
          <MenuItem value={"INR"} onClick={() => dispatch({ type: "INR" })}>
            INR
          </MenuItem>
          <MenuItem value={"USD"} onClick={() => dispatch({ type: "DOLLAR" })}>
            USD
          </MenuItem>
        </Select>
      </Toolbar>
    </Container>
  );
};

export default Viewmarketheader;
