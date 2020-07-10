import React from "react";
import { render, screen, fireEvent} from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
  render(<CheckoutForm />);
  const formHeader = screen.getByText(/checkout form/i);
  expect(formHeader).toBeInTheDocument();
});

test("form shows success message on submit with form details", () => {
  render(<CheckoutForm />);

  const firstNameInput = screen.getByLabelText(/First Name:/i);
  const lastNameInput = screen.getByLabelText(/Last Name:/i);
  const addressInput = screen.getByLabelText(/Address:*/i);
  const cityInput = screen.getByLabelText(/City:*/i);
  const stateInput = screen.getByLabelText(/State:*/i);
  const zipInput = screen.getByLabelText(/Zip:*/i);

  fireEvent.change(firstNameInput, { target: { value: 'Maryam' } });
  fireEvent.change(lastNameInput, { target: { value: 'Mosstoufi' } });
  fireEvent.change(addressInput, { target: { value: '11677 Danville Dr' } });
  fireEvent.change(cityInput, { target: { value: 'North Bethesda' } });
  fireEvent.change(stateInput, { target: { value: 'MD' } });
  fireEvent.change(zipInput, { target: { value: '20852' } });
  
  const submitButton = screen.getByRole('button');
  fireEvent.click(submitButton);

  const successMessage = screen.getByTestId('successMessage');
  expect(successMessage).toBeVisible();
  const nameMessage = screen.getByText(/maryam mosstoufi/i);
  const addressMessage = screen.getByText(/11677 Danville Dr/i);
  const cityStateZipMessage = screen.getByText(/North Bethesda, MD 20852/i);
  //expect(successMessage).toContain(firstNameInput.value);
});
