import { render, screen } from '@testing-library/react'
import TermsAndConditions from '../../src/components/TermsAndConditions'
import userEvent from '@testing-library/user-event';

//Simplifying our Tests with separate render component function
describe('TermsAndConditions', () => {
    const renderComponent = () => {
        render(<TermsAndConditions />);
        return {
            heading: screen.getByRole('heading'),
            checkbox: screen.getByRole('checkbox'),
            button: screen.getByRole('button')
        }
    }
    
    it('should render with correct text and initial state', () => {
        const { heading, checkbox, button } = renderComponent();

        expect(heading).toHaveTextContent(/Terms & Conditions/i);
        expect(checkbox).not.toBeChecked();
        //If you have multiple buttons, you can filter with the second parameter
        //screen.getByRole('button', { name: /submit/i })
        expect(button).toHaveTextContent(/submit/i);
        expect(button).toBeDisabled();
    });
    
    it('should enable the button when the checkbox is checked', async () => {
        const { button, checkbox } = renderComponent();
        //Arrange
        render(<TermsAndConditions />);
        //Act
        const user = userEvent.setup();
        await user.click(checkbox);
        //Assert
        expect(button).toBeEnabled();
    })
})