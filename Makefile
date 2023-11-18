build:
	rm -rf dist
	rm -rf ios
	rm -rf android
	ionic build
	ionic cap add ios
	ionic cap add android

build-web:
	rm -rf dist
	ionic build

open: build
	ionic cap open ios
	ionic cap open android


another:
	ionic cap copy
	ionic cap sync
	ionic cap open ios
	ionic cap open android