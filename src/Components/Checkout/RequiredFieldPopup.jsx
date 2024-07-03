import React from "react";

export const RequiredFieldPopup = () => {
  return (
    <div id="myModal" style={{ overflow: "hidden" }}>
      <div id="myModal-container" role="dialog" aria-modal="true">
        <div id="addressValidatorBox">
          <h2>Please fill in required fields</h2>
        </div>
      </div>
    </div>
  );
};
