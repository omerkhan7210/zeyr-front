import React from "react";

const ShippingCalculator = ()=>{
    return (
        <table className="shop_table shop_table_responsive">
												<tbody>
													<tr className="shipping-totals shipping">
														<th>Shipping</th>

														<td data-title="Shipping">
															<ul id="shipping_method" className="shipping-methods">
																<li>
																	<input type="radio" name="shipping_method" id="shipping_method_0_free_shipping1" className="shipping_method"/>
																	<label for="shipping_method_0_free_shipping1">Free shipping</label>
																</li>
																<li>
																	<input type="radio" name="shipping_method" id="shipping_method_0_flat_rate2" className="shipping_method"/>
																	<label for="shipping_method_0_flat_rate2">Flat rate: $15</label>
																</li>
																<li>
																	<input type="radio" name="shipping_method" id="shipping_method_0_local_pickup3" className="shipping_method" checked="checked"/>
																	<label for="shipping_method_0_local_pickup3">Local pickup: $8</label>
																</li>
															</ul>

															<p className="shipping-destination"> Shipping to <strong>America</strong>.</p>
															<form className="shipping-calculator" action="#" method="post">
																<a href="#" className="shipping-calculator-button">Change address</a>

																<section className="shipping-calculator-form">
																	<h2 className="hidden">Shipping</h2>
																	<p className="form-row form-row-wide validate-required" id="shipping_country_field" data-priority="40">
																		<select name="orderby" className="konte-select2--small konte-select2--full" aria-label="Shop order" tabIndex="-1" aria-hidden="true">
																			<option value="0">Select a country</option>
																			<option value="Afghanistan">Afghanistan</option>
																			<option value="America" selected="selected">America</option>
																			<option value="Andorra">Andorra</option>
																			<option value="Anguilla">Anguilla</option>
																			<option value="Argentina">Argentina</option>
																			<option value="Armenia">Armenia</option>
																			<option value="Andorra">Australia</option>
																		</select>
																	</p>

																	<p className="form-row form-row-wide">
																		<input type="text" id="calc_shipping_state" name="calc_shipping_state" placeholder="State / County" className="input-text undefined" data-placeholder="State / County"/>
																	</p>
																	<p className="form-row form-row-wide">
																		<input type="text" className="input-text" value="" placeholder="Town / City" name="calc_shipping_city" id="calc_shipping_city" data-placeholder="Town / City"/>
																	</p>
																	<p className="form-row form-row-wide">
																		<input type="text" className="input-text" value="" placeholder="Postcode / ZIP" name="calc_shipping_postcode" id="calc_shipping_postcode" data-placeholder="Postcode / ZIP"/>
																	</p>

																	<p><button type="submit" name="calc_shipping" value="1" className="button">Update</button></p>

																</section>
															</form>
														</td>
													</tr>
												</tbody>
											</table>
    )
}

export default ShippingCalculator;