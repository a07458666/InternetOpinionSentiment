import { render, screen , fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Keyword from '../Keyword';
import moment from 'moment';
import axio_instance from '../../axio_instance'
import MockAdapter from 'axios-mock-adapter'
import { act } from "react-dom/test-utils";
describe('Keyword Page', () => {

  test('Title and Time format', async() => {
    const {container} = render(<Keyword/>);
    expect(screen.getByText(/Keyword/i)).toBeInTheDocument();
    // const inputs = screen.getAllByDisplayValue(/\d{4}-\d{2}-\d{2}/i)
    const startTimeInput = screen.getByPlaceholderText("Start date")
    const endTimeInput = screen.getByPlaceholderText("End date")
    const time1 = startTimeInput.value
    const time2 = endTimeInput.value
    expect(moment(time1).isValid()).toBeTruthy()
    expect(moment(time2).isValid()).toBeTruthy()
    fireEvent.mouseDown(endTimeInput)
    let date ;
    await waitFor(() => {
      date = screen.getAllByText('30')[0]
    });
    
    fireEvent.click(date)
    fireEvent.click(date)
    await waitFor(() => {
      expect(startTimeInput.value).not.toBe(time1)
      expect(endTimeInput.value).not.toBe(time2)
    });
   
  });

});
const fake_data = {
  status: "normal",
  error_msg: null,
  data: [
      {
          "Count": 2,
          "Company": "SUMCO",
          "Timestamp": "2022-05-24"
      },
      {
          "Count": 3,
          "Company": "Intel",
          "Timestamp": "2022-05-24"
      },
      {
          "Count": 5,
          "Company": "Intel",
          "Timestamp": "2022-05-11"
      },
      {
          "Count": 1,
          "Company": "SUMCO",
          "Timestamp": "2022-05-11"
      },
  ],
  "query_id": "query id not implement yet"
}
describe('Keyword Page (Mock Axio)',()=>{
  let container;
  
  test('data display',async()=>{
    const mock = new MockAdapter(axio_instance)
    mock.onGet('getkeyword').reply(200, fake_data)
    await act(async() => {
      container = await render(<Keyword />).container
      return container
    });
    const labels = container.querySelectorAll('.recharts-legend-item-text')
    // console.log(labels.length())
    labels.forEach((label)=>{
      expect(label.textContent).toMatch(/Intel|SUMCO/)
    })    
    const target = screen.getByRole('linechart')
    userEvent.hover(target);
    expect(screen.getByRole('linechart')).toBeTruthy();

    // remove the mock to ensure tests are completely isolated
    mock.restore();
  })
})



