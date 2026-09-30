import { describe, it, expect } from 'vitest';
import { TIPOS, assignIds, sortTasks, type Task } from './todo-format';

const task = (over: Partial<Task> = {}): Task => ({
	id: '#T0001',
	estado: 'pendiente',
	prioridad: 'media',
	tipo: 'otro',
	titulo: 'Algo',
	anotada: '2026-09-29',
	origen: 'usuario',
	descripcion: ['linea uno'],
	...over
});

describe('sortTasks', () => {
	it('orders pendientes by priority, en curso first, newest anotada, then id; hechas last', () => {
		const list = [
			task({ id: '#T0001', prioridad: 'baja' }),
			task({ id: '#T0002', prioridad: 'alta', anotada: '2026-09-01' }),
			task({ id: '#T0003', prioridad: 'alta', anotada: '2026-09-20' }),
			task({ id: '#T0004', prioridad: 'alta', estado: 'en curso', anotada: '2026-08-01' }),
			task({ id: '#T0005', prioridad: 'media', anotada: 'sin fecha' }),
			task({ id: '#T0006', prioridad: 'media', anotada: '2026-09-02' }),
			task({ id: '#T0007', prioridad: 'alta', anotada: '2026-09-20' }),
			task({ id: '#T0008', estado: 'hecha', prioridad: 'alta', hecha: '2026-09-10' }),
			task({ id: '#T0009', estado: 'hecha', hecha: '2026-09-25' }),
			task({ id: '#T0010', estado: 'hecha', anotada: 'sin fecha' }),
			task({ id: '#T0011', estado: 'hecha', anotada: '2026-09-28' })
		];
		expect(sortTasks(list).map((t) => t.id)).toEqual([
			'#T0004',
			'#T0003',
			'#T0007',
			'#T0002',
			'#T0006',
			'#T0005',
			'#T0001',
			'#T0009',
			'#T0008',
			'#T0011',
			'#T0010'
		]);
	});

	it('does not mutate its input', () => {
		const list = [task({ id: '#T0002', prioridad: 'baja' }), task({ id: '#T0001' })];
		sortTasks(list);
		expect(list[0].id).toBe('#T0002');
	});
});

describe('assignIds', () => {
	it('gives new ids after the max, never reusing, in order', () => {
		const list = [
			task({ id: '#T0005' }),
			task({ id: '', titulo: 'a' }),
			task({ id: '#T0002' }),
			task({ id: '', titulo: 'b' })
		];
		expect(assignIds(list).map((t) => t.id)).toEqual(['#T0005', '#T0006', '#T0002', '#T0007']);
	});

	it('starts at T0001 for an empty set', () => {
		expect(assignIds([task({ id: '' })])[0].id).toBe('#T0001');
	});
});

describe('TIPOS', () => {
	it('has no duplicates and keeps otro as the catch-all', () => {
		expect(new Set(TIPOS).size).toBe(TIPOS.length);
		expect(TIPOS).toContain('otro');
	});
});
