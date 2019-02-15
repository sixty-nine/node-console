// tslint:disable:no-expression-statement
import test from 'ava';
import { asyncABC } from '../lib/async';

test('getABC', async t => {
  t.deepEqual(await asyncABC(), ['a', 'b', 'c']);
});
