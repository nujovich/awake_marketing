# Claude Code Setup

## Configuración local

El límite de output tokens está configurado en `.claude/settings.json` para evitar errores.

Si necesitás overridear localmente:
1. Crea `.claude/settings.local.json`
2. Agregá tu configuración
3. NO lo commitees (está en .gitignore)

Ejemplo para debugging:
```json
{
  "max_output_tokens": 150000
}
```