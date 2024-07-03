import React, { useContext } from "react";
import { ProductDetailsContext } from "../ProductDetailPage";

export const SizeDrawer = ({ isSizeGuideDrawerOpen }) => {
  const { handleNavbar } = useContext(ProductDetailsContext);

  return (
    <aside>
      <span
        id="drawerTrigger"
        className="link-styled size-guide-trigger flex jcc aic"
        hidden
        onClick={() => {
          handleNavbar("sizeGuide");
        }}
      >
        <span className="flex" style={{ paddingRight: "4px" }}>
          <svg
            className="icon icon--size-guide"
            width={17}
            height={16}
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.2957 14.6673V1.33398"
              stroke="black"
              strokeWidth="0.625"
              strokeMiterlimit={10}
            ></path>
            <path
              d="M1.96252 1.33398V14.6673"
              stroke="black"
              strokeWidth="0.625"
              strokeMiterlimit={10}
            ></path>
            <path
              d="M13.668 8.00343L3.66785 7.99805"
              stroke="black"
              strokeWidth="0.625"
              strokeMiterlimit={10}
            />
            <path
              d="M11.13 5.5L13.6675 8.0037L11.13 10.4948"
              stroke="black"
              strokeWidth="0.625"
              strokeMiterlimit={10}
              strokeLinejoin="bevel"
            />
            <path
              d="M6.13403 5.49609L3.66785 8.00293L6.13403 10.4941"
              stroke="black"
              strokeWidth="0.625"
              strokeMiterlimit={10}
              strokeLinejoin="bevel"
            />
          </svg>
        </span>
        Size Guide
      </span>
      <div
        className={`drawer side-drawer default-drawer size-guide-drawer flex aic jcc ${
          isSizeGuideDrawerOpen ? "drawer--active" : ""
        }`}
      >
        <div
          id="drawerOverlay"
          className="drawer--overlay"
          onClick={() => {
            handleNavbar("sizeGuide");
          }}
        /><dialog className="drawer__container" open={isSizeGuideDrawerOpen}>

          <div className="drawer__container-inner">
            <button
              id="drawerClose"
              onClick={() => {
                handleNavbar("sizeGuide");
              }}
              className="drawer__close drawer__close-container-only btn btn--unstyled content--floating"
              aria-label="Drawer close"
            >
              <svg
                className="icon icon--close"
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Close"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.43437 7.99993L0.517212 14.9171L1.0829 15.4828L8.00005 8.56562L14.9172 15.4828L15.4829 14.9171L8.56574 7.99993L15.4829 1.08278L14.9172 0.51709L8.00005 7.43424L1.0829 0.51709L0.517212 1.08278L7.43437 7.99993Z"
                  fill="black"
                />
              </svg>
            </button>
            <h2 className="drawer-title smaller-heading text-center">
              Size Guide
            </h2>
            <div className="drawer-content">
              <div
                className="size-guide-selector-container"
                style={{ display: "none" }}
              >
                <h3 className="size-guide-selector__title body-2 text-center">
                  Sizing
                </h3>
                <div className="size-guide-selector flex jcc aic">
                  <button
                    data-chart="size-jp"
                    className="size-guide-selector__btn btn body-1"
                  >
                    JP
                  </button>
                </div>
                <div className="size-guide-selector__units text-right">
                  <span className="size-guide-selector__units-label body-2">
                    Units:
                  </span>
                  <span
                    data-type="cm"
                    className="size-guide-selector__units-cm body-1"
                  >
                    CM
                  </span>
                  <span
                    data-type="in"
                    className="size-guide-selector__units-in active body-1"
                  >
                    IN
                  </span>
                </div>
              </div>
    <div className="table-container">
  <table id="size-us-in" height={227} style={{marginLeft: 'auto', marginRight: 'auto'}} className="active">
    <thead>
      <tr>
        <th style={{textAlign: 'center'}}>US</th>
        <th style={{textAlign: 'center'}}>
          <span>IT/EU</span>
        </th>
        <th style={{textAlign: 'center'}}>FR</th>
        <th style={{textAlign: 'center'}}>CN</th>
        <th>UK</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style={{textAlign: 'center'}}>XXS</td>
        <td style={{textAlign: 'center'}}>42</td>
        <td style={{textAlign: 'center'}}>38</td>
        <td style={{textAlign: 'center'}}>170/80A</td>
        <td style={{textAlign: 'center'}}>32</td>
      </tr>
      <tr>
        <td style={{textAlign: 'center'}}>XS</td>
        <td style={{textAlign: 'center'}}>44</td>
        <td style={{textAlign: 'center'}}>40</td>
        <td style={{textAlign: 'center'}}>
          <span>175/84A</span>
        </td>
        <td style={{textAlign: 'center'}}>34</td>
      </tr>
      <tr>
        <td style={{textAlign: 'center'}}>S</td>
        <td style={{textAlign: 'center'}}>46</td>
        <td style={{textAlign: 'center'}}>42</td>
        <td style={{textAlign: 'center'}}>
          <span>175/88A</span>
        </td>
        <td style={{textAlign: 'center'}}>36</td>
      </tr>
      <tr>
        <td style={{textAlign: 'center'}}>M</td>
        <td style={{textAlign: 'center'}}>48</td>
        <td style={{textAlign: 'center'}}>44</td>
        <td style={{textAlign: 'center'}}>
          <span>175/92A</span>
        </td>
        <td style={{textAlign: 'center'}}>38</td>
      </tr>
      <tr>
        <td style={{textAlign: 'center'}}>L</td>
        <td style={{textAlign: 'center'}}>50</td>
        <td style={{textAlign: 'center'}}>46</td>
        <td style={{textAlign: 'center'}}>
          <span>180/96A</span>
        </td>
        <td style={{textAlign: 'center'}}>40</td>
      </tr>
      <tr>
        <td style={{textAlign: 'center'}}>XL</td>
        <td style={{textAlign: 'center'}}>52</td>
        <td style={{textAlign: 'center'}}>48</td>
        <td style={{textAlign: 'center'}}>
          <span>180/100A</span>
        </td>
        <td style={{textAlign: 'center'}}>42</td>
      </tr>
      <tr>
        <td style={{textAlign: 'center'}}>XXL</td>
        <td style={{textAlign: 'center'}}>54</td>
        <td style={{textAlign: 'center'}}>50</td>
        <td style={{textAlign: 'center'}}>
          <span>180/104A</span>
        </td>
        <td style={{textAlign: 'center'}}>44</td>
      </tr>
      <tr>
        <td style={{textAlign: 'center'}}>XXL</td>
        <td style={{textAlign: 'center'}}>56</td>
        <td style={{textAlign: 'center'}}>52</td>
        <td style={{textAlign: 'center'}}>
          <span>185/108A</span>
        </td>
        <td style={{textAlign: 'center'}}>46</td>
      </tr>
      <tr>
        <td style={{textAlign: 'center'}}>XXXL</td>
        <td style={{textAlign: 'center'}}>58</td>
        <td style={{textAlign: 'center'}}>54</td>
        <td style={{textAlign: 'center'}}><span>185/112A</span></td>
        <td style={{textAlign: 'center'}}>48</td>
      </tr>
      <tr>
        <td style={{textAlign: 'center'}}>XXXL</td>
        <td style={{textAlign: 'center'}}>60</td>
        <td style={{textAlign: 'center'}}>56</td>
        <td style={{textAlign: 'center'}}><span>185/116A</span></td>
        <td style={{textAlign: 'center'}}>50</td>
      </tr>
    </tbody>
  </table>
</div>

    
            </div>
          </div>
        </dialog>
      </div>
    </aside>
  );
};
