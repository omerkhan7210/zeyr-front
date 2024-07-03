import React from "react";

const CouponCode = ()=>{
    return (
        <tr>
													<td colspan="6" className="actions">
														<div className="coupon">
															<label for="coupon_code">Coupon:</label>
															<input type="text" name="coupon_code" className="input-text" id="coupon_code" value="" placeholder="Coupon code"/>
															<button type="submit" className="button" name="apply_coupon" value="Apply coupon">Apply coupon</button>
														</div>

														<button type="submit" className="button" name="update_cart" value="Update cart" disabled="">Update cart</button>

														<button type="submit" className="button empty-cart-button" name="empty_cart" value="Clear cart">Clear cart</button>
													</td>
												</tr>
    )
}
export default CouponCode;