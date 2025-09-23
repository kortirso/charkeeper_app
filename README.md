## Build

```bash
yarn tauri build --bundles dmg # MacOS
yarn tauri android build --aab # Android
yarn tauri ios build --export-method app-store-connect # iOS
```

## Distribute

```bash
xcrun altool --upload-app --type ios --file "src-tauri/gen/apple/build/arm64/Charkeeper.ipa" --apiKey ... --apiIssuer ...
```
