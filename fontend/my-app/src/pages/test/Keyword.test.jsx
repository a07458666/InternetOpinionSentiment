import { render, screen  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Keyword from '../Keyword';
import moment from 'moment';
import axio_instance from '../../axio_instance'
import MockAdapter from 'axios-mock-adapter'
import { act } from "react-dom/test-utils";
describe('Keyword Page', () => {
  beforeEach(() =>{ 
    render(<Keyword />) // it will auto cleanup in aftereach
  });
  test('Title', () => {
    expect(screen.getByText(/Keyword/i)).toBeInTheDocument();
  });
  test('Time Format', () => {
    const timeText = screen.getByText(/\d{4}-\d{2}-\d{2} - \d{4}-\d{2}-\d{2}/i)
    const [time1,time2] = timeText.textContent.split(' - ')

    expect(moment(time1).isValid()).toBeTruthy()
    expect(moment(time2).isValid()).toBeTruthy()
    expect(timeText).toBeInTheDocument();
  });

  test('Recharts Exists',()=>{
    expect(screen.getByRole('linechart')).toBeTruthy();
  })

  test('Line Charts Hover Event',()=>{
    const target = screen.getByRole('linechart')
    userEvent.hover(target);
    expect(screen.getByRole('linechart')).toBeTruthy();
  })

});
describe('Keyword Page (Mock Axio)',()=>{
  let container;
  test('data',async()=>{
    const mock = new MockAdapter(axio_instance)
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
    mock.onGet('getkeyword').reply(200, fake_data)
    await act(async () => {
      container = await render(<Keyword />).container;
    });
    const labels = container.querySelectorAll('.recharts-legend-item-text')
    // console.log(labels.length())
    labels.forEach((label)=>{
      expect(label.textContent).toMatch(/Intel|SUMCO/)
    })
    

    // remove the mock to ensure tests are completely isolated
    mock.restore();
  })
})



