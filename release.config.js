export default {
  "branches": ['master', '+([0-9])?(.{+([0-9]),x}).x'],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    ["@semantic-release/exec", {
      "generateNotesCmd": "echo -n \"${nextRelease.version}\" > VERSION"
    }],
    ["@google/semantic-release-replace-plugin",
      {
        "replacements": [
          {
            "files": ["helm/Chart.yaml"],
            "from": '(appV|v)ersion: .*',
            "to": '$1ersion: ${nextRelease.version}',
            "results": [{
              "file": "helm/Chart.yaml",
              "hasChanged": true,
              "numMatches": 2,
              "numReplacements": 2
            }],
            "countMatches": true
          },
          {
            "files": ["package.json"],
            "from": '"version": ".*",',
            "to": '"version": "${nextRelease.version}",',
            "results": [{
              "file": "package.json",
              "hasChanged": true,
              "numMatches": 1,
              "numReplacements": 1
            }],
            "countMatches": true
          }]
      },
    ],
    ["@semantic-release/git", {
      "assets": [
        "helm/Chart.yaml",
        "package.json"
      ],
      "message": "chore(release): ${nextRelease.version} [skip semantic release]\n\n${nextRelease.notes}"
    }],
    ["@semantic-release/gitlab", {}]
  ]
};
