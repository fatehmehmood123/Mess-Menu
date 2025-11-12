import { menuReducer, clearError, fetchTodayMenu, fetchWeeklyMenu } from './menu';

// Helper to reduce boilerplate when dispatching actions to the reducer
function reduce(state, action) {
  return menuReducer(state, action);
}

describe('menu reducer', () => {
  it('should return initial state', () => {
    const state = reduce(undefined, { type: '@@INIT' });
    expect(state).toEqual({
      todayMenu: null,
      weeklyMenu: null,
      todayLoading: false,
      weeklyLoading: false,
      todayError: null,
      weeklyError: null,
    });
  });

  it('should set todayLoading on fetchTodayMenu.pending and clear todayError', () => {
    const prev = {
      todayMenu: null,
      weeklyMenu: null,
      todayLoading: false,
      weeklyLoading: false,
      todayError: 'boom',
      weeklyError: null,
    };
    const next = reduce(prev, fetchTodayMenu.pending());
    expect(next.todayLoading).toBe(true);
    expect(next.todayError).toBeNull();
  });

  it('should set todayMenu and clear todayLoading on fetchTodayMenu.fulfilled', () => {
    const payload = { meals: { breakfast: ['A'], lunch: ['B'], dinner: ['C'] } };
    const prev = {
      todayMenu: null,
      weeklyMenu: null,
      todayLoading: true,
      weeklyLoading: false,
      todayError: null,
      weeklyError: null,
    };
    const next = reduce(prev, fetchTodayMenu.fulfilled(payload));
    expect(next.todayLoading).toBe(false);
    expect(next.todayMenu).toEqual(payload);
  });

  it('should set todayError and clear todayLoading on fetchTodayMenu.rejected', () => {
    const prev = {
      todayMenu: null,
      weeklyMenu: null,
      todayLoading: true,
      weeklyLoading: false,
      todayError: null,
      weeklyError: null,
    };
    const action = fetchTodayMenu.rejected('Network', undefined, undefined, 'Network error');
    const next = reduce(prev, action);
    // Our slice uses rejectWithValue(error.message), which becomes action.payload
    // In this synthetic action, the error message may be on error.message or payload depending on how created.
    expect(next.todayLoading).toBe(false);
    expect(next.todayError).not.toBeNull();
  });

  it('should set weeklyLoading on fetchWeeklyMenu.pending and clear weeklyError', () => {
    const prev = {
      todayMenu: null,
      weeklyMenu: null,
      todayLoading: false,
      weeklyLoading: false,
      todayError: null,
      weeklyError: 'bad',
    };
    const next = reduce(prev, fetchWeeklyMenu.pending());
    expect(next.weeklyLoading).toBe(true);
    expect(next.weeklyError).toBeNull();
  });

  it('should set weeklyMenu and clear weeklyLoading on fetchWeeklyMenu.fulfilled', () => {
    const payload = { menu: { monday: { breakfast: ['X'] } } };
    const prev = {
      todayMenu: null,
      weeklyMenu: null,
      todayLoading: false,
      weeklyLoading: true,
      todayError: null,
      weeklyError: null,
    };
    const next = reduce(prev, fetchWeeklyMenu.fulfilled(payload));
    expect(next.weeklyLoading).toBe(false);
    expect(next.weeklyMenu).toEqual(payload);
  });

  it('should set weeklyError and clear weeklyLoading on fetchWeeklyMenu.rejected', () => {
    const prev = {
      todayMenu: null,
      weeklyMenu: null,
      todayLoading: false,
      weeklyLoading: true,
      todayError: null,
      weeklyError: null,
    };
    const action = fetchWeeklyMenu.rejected('Network', undefined, undefined, 'Network error');
    const next = reduce(prev, action);
    expect(next.weeklyLoading).toBe(false);
    expect(next.weeklyError).not.toBeNull();
  });

  it('clearError should clear both todayError and weeklyError', () => {
    const prev = {
      todayMenu: null,
      weeklyMenu: null,
      todayLoading: false,
      weeklyLoading: false,
      todayError: 'a',
      weeklyError: 'b',
    };
    const next = reduce(prev, clearError());
    expect(next.todayError).toBeNull();
    expect(next.weeklyError).toBeNull();
  });
});
