import { render, screen  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Keyword from '../Keyword';
import moment from 'moment';
describe('Keyword Page', () => {
  
  beforeEach(() =>{ // if use beforeall it will auto cleanup in aftereach
    render(<Keyword />)
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



