const CustomPrevArrow = (props) => (
  <div className="slick-arrow-prev" onClick={props.onClick}>
    <span className="th-dots th-arrow-left th-dots-animated">
      <span />
      <span />
      <span />
    </span>
  </div>
);

export default CustomPrevArrow;