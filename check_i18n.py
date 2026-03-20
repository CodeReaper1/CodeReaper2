import os, re, json

def get_keys(obj, prefix=''):
    keys = set()
    for k, v in obj.items():
        if isinstance(v, dict):
            keys.update(get_keys(v, prefix + k + '.'))
        else:
            keys.add(prefix + k)
    return keys

en_path = 'c:/Users/Frederic/Downloads/New folder/New folder/teraformed/teraformed/nuxt-frontend/i18n/locales/en.json'
bg_path = 'c:/Users/Frederic/Downloads/New folder/New folder/teraformed/teraformed/nuxt-frontend/i18n/locales/bg.json'

with open(en_path, 'r', encoding='utf-8') as f:
    en_keys = get_keys(json.load(f))
with open(bg_path, 'r', encoding='utf-8') as f:
    bg_keys = get_keys(json.load(f))

vue_dir = 'c:/Users/Frederic/Downloads/New folder/New folder/teraformed/teraformed/nuxt-frontend/app'
found_keys = set()
for root, _, sorted_files in os.walk(vue_dir):
    for filename in sorted_files:
        if filename.endswith('.vue'):
            path = os.path.join(root, filename)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                matches = re.findall(r'\$t\([\'\"](.*?)[\'\"]\)', content)
                found_keys.update(matches)

missing_en = list(found_keys - en_keys)
missing_bg = list(found_keys - bg_keys)

with open('missing_keys.json', 'w', encoding='utf-8') as f:
    json.dump({'en': sorted(missing_en), 'bg': sorted(missing_bg)}, f, indent=2)

print("Check finished.")
