import { createPinia } from 'pinia';
import { setItem, getItem } from 'localforage';
import { isRef, toRaw } from 'vue';

const pinia = createPinia();

function toRawObject(obj: any) {
  if (isRef(obj)) return toRaw(obj.value);

  // If the object is an array or a plain object, recursively convert its properties
  if (Array.isArray(obj) || (obj && typeof obj === 'object')) {
    const result: any = Array.isArray(obj) ? [] : {};

    for (const key in obj) result[key] = toRawObject(obj[key]);

    return result;
  }

  if (obj?.__v_isReactive) return toRaw(obj);

  return obj;
}

pinia.use(({ store }) => {
  getItem(store.$id).then(
    (savedState) => savedState && store.$patch(savedState)
  );

  store.$subscribe(
    async (_, state) => await setItem(store.$id, toRawObject(state))
  );
});

export default pinia;
